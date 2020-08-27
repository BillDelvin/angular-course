import { Injectable, EventEmitter } from "@angular/core";
import { Recipes } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  constructor(private slService: ShoppingListService) {}

  recipesSelected = new EventEmitter<Recipes>();
  private recipes: Recipes[] = [
    new Recipes(
      "A Test Recipe",
      "This is simple a test",
      "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&h=350",
      [new Ingredient("Meat", 1), new Ingredient("French Fries", 1)]
    ),
    new Recipes(
      "A Test Recipe 1",
      "This is Advanced a test",
      "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&h=350",
      [new Ingredient("Bakso", 2), new Ingredient("Mie Goreng", 2)]
    ),
  ];

  getRecipes() {
    // slice() with empty argument it return the copy of recipes
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }
}
