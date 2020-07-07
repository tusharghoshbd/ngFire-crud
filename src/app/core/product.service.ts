import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class ProductService {

    constructor(public http: HttpClient,
        private ngFireStore: AngularFirestore,
        private ngFireStorage: AngularFireStorage
    ) { }

    getAllProducts() {
        return this.ngFireStore.collection('products').snapshotChanges()
            .pipe(
                map(action => action
                    .map(a => {
                        let obj: any=a.payload.doc.data()
                        return {
                            ...obj,
                            id: a.payload.doc.id
                        };
                    })
                )
            );
    }
    addProduct(product: any) {

        return this.ngFireStore.collection('products').add({
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size,
            createAt: new Date().getTime()
        }).then(async (data) => {
            if (product.file) {
                const path=`productImage/${data.id}`;
                const ref=this.ngFireStorage.ref(path);
                return this.ngFireStorage.upload(path, product.file).then(async () => {
                    let downloadURL=await ref.getDownloadURL().toPromise();
                    return this.ngFireStore.collection('products').doc(data.id).update({
                        imageUrl: downloadURL,
                        imageSize: product.file.size,
                        imageNameOrgName: product.file.name
                    }).then((updateData) => { 
                        console.log("updatedate", updateData);
                        return data;
                    });
                });
            }
            else {
                return data;
            }
        });
    }
    updateProduct(product: any) {
        return this.ngFireStore.collection('products').doc(product.id).update({
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size
        });
    }
    deleteProduct(id: string) {
        return this.ngFireStore.collection('products').doc(id).delete();
    }
}

