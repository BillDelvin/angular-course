import { Component, OnInit, Input } from "@angular/core";
import { Recipes } from "../recipes.model";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipes;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {}

  onAddToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
