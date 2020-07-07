import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from '../core/product.service';
import { AuthService } from '../core/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    title='CRUD operation using firebase';
    sub: Subscription;
    products: any=[];
    product: any={ id: 0, name: "", price: "", color: "", size: "", file:"" };
    editFlag=false;
    constructor(
        public productService: ProductService,
        public authService: AuthService) { }

    ngOnInit() {
        this.getProducts();
    }
    onAddProductSubmit() {
        if (this.editFlag==false) {
            console.log(this.product);
            this.productService.addProduct(this.product).then((data: any) => {
                console.log("compo ts ", data);
                if (data.id!=null) {
                    this.getProducts();
                    this.resetForm();
                }
                else {
                    console.log("Failed");
                }
            });
        }
        else {
            this.productService.updateProduct(this.product).then((data: any) => {
                this.getProducts();
                this.resetForm();
            }, err => {
                console.log(err);
            });
        }

    }

    onEditProduct(id: string, pProduct: any) {
        // let tempProduct = JSON.parse(JSON.stringify(pProduct));
        this.product=JSON.parse(JSON.stringify(pProduct))
        this.editFlag=true;
    }

    onDeleteProduct(pId: string) {
        this.productService.deleteProduct(pId).then((data: any) => {
            this.getProducts();
        }, err => {
            console.log(err);
        });
    }

    resetForm() {
        this.product={ id: 0, name: "", price: "", color: "", size: "", file:""  };
        this.editFlag=false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    signout() { 
        this.authService.signOut();
    }

    uploadFile(event) {
        this.product.file=event.target.files[0];
        // // const randomId = Math.random().toString(36).substring(2);
        // const filePath = 'productImage/test';
        // const ref = this.ngFireStorage.ref(filePath);
        // const task = ref.put(file);
    }

    private getProducts() {
        this.sub=this.productService.getAllProducts().subscribe((data: any) => {
            this.products=data;
        });

    }

}
