import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ShoppingListService {
  constructor() {}

  ingredientChanged = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Avokado", 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    //   for (let ingredient of ingredients) {
    //     this.addIngredient(ingredient);
    //   }
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
