import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Recipes } from "../recipes/recipes.model";
import { RecipesService } from "../recipes/recipes.service";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipesService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put("https://angular-course-34446.firebaseio.com/recipes.json", recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipe() {
    this.http
      .get<Recipes[]>(
        "https://angular-course-34446.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.recipeService.setRecipes(response);
      });
  }
}
