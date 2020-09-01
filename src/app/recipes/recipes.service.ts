import { Injectable } from "@angular/core";
import { Recipes } from "./recipes.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RecipesService {
  constructor(private slService: ShoppingListService) {}

  recipeChanged = new Subject<Recipes[]>();

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

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipes) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipes) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
