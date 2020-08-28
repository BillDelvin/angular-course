import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService) {}

  ingredients: Ingredient[];
  ingsChangeSubs: Subscription;

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingsChangeSubs = this.slService.ingredientChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }

  ngOnDestroy() {
    this.ingsChangeSubs.unsubscribe();
  }
}
