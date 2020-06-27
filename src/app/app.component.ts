import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title='CRUD operation using firebase';
    sub: Subscription;
    products: any=[];
    product: any={ id: 0, name: "", price: "", color: "", size:"" };
    editFlag=false;
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.getProducts();
    }
    onAddProductSubmit() {
        if (this.editFlag==false) {
            this.productService.addProduct(this.product).then((data: any) => {
                
                if (data.id != null) {
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
        this.product={ id: 0, name: "", price: "", color: "", size:"" };
        this.editFlag=false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getProducts() {
        this.sub=this.productService.getAllProducts().subscribe((data: any) => {
            this.products=data;
        });

    }
}
