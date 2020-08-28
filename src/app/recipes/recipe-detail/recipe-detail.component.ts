import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { Recipes } from "../recipes.model";
import { RecipesService } from "../recipes.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute
  ) {}

  recipe: Recipes;
  id: number;
  recipeSubs: Subscription;

  ngOnInit(): void {
    this.recipeSubs = this.route.params.subscribe((param: Params) => {
      this.id = +param["id"];
      this.recipe = this.recipesService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnDestroy() {
    this.recipeSubs.unsubscribe();
  }
}
