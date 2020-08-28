import { Component, OnInit } from "@angular/core";
import { Recipes } from "../recipes.model";
import { RecipesService } from "../recipes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipes[];

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
