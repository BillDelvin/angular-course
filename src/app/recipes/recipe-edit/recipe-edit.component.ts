import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
import { RecipesService } from "../recipes.service";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService
  ) {}

  id: number;
  editMode = false;
  paramSubs: Subscription;
  recipeForm: FormGroup;

  ngOnInit(): void {
    this.paramSubs = this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredient = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe["ingredients"]) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredient.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredient,
    });
  }

  get ingredients() {
    return <FormArray>this.recipeForm.get("ingredients");
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  ngOnDestroy() {
    this.paramSubs.unsubscribe();
  }
}
