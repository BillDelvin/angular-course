import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipes } from "../recipes.model";
import { RecipesService } from "../recipes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  recipes: Recipes[];
  recipeChanged: Subscription;

  ngOnInit(): void {
    this.recipeChanged = this.recipesService.recipeChanged.subscribe(
      (recipes: Recipes[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeChanged.unsubscribe();
  }
}
