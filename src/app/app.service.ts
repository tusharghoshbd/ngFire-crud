import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ProductService {
   
    constructor(public http: HttpClient, private fireStore: AngularFirestore) { }
    
    getAllProducts() {
        return this.fireStore.collection('products').snapshotChanges()
            .pipe(
                map(action => action
                    .map(a => {
                        let obj:any = a.payload.doc.data()
                        return {
                            ...obj,
                            id: a.payload.doc.id
                        };
                    })
                )
            );
    }
    addProduct(product: any) {
        
        return this.fireStore.collection('products').add({
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size,
            createAt: new Date().getTime()
        });
    }
    updateProduct(product: any) {
        return this.fireStore.collection('products').doc(product.id).set({
            name: product.name,
            price: product.price,
            color: product.color,
            size: product.size
        });
    }
    deleteProduct(id:string){
        return this.fireStore.collection('products').doc(id).delete();
    }
} 

