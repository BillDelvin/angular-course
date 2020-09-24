import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipesService } from "../recipes.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
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

  onSubmit() {
    // can use this way too
    // const newRecipe = new Recipes(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["ingredients"]
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(["../"], { relativeTo: this.route });
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
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredient,
    });
  }

  get ingredients() {
    return <FormArray>this.recipeForm.get("ingredients");
  }

  onAddIngredient() {
    const addIng = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
    });

    (<FormArray>this.recipeForm.get("ingredients")).push(addIng);
  }

  onDeleteIngredient(index: number) {
    console.log(index);
    // for remove all item in array
    // (<FormArray>this.recipeForm.get("ingredients")).clear(index);
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  onCancel() {
    // this.router.navigate(["/recipes", this.id], { relativeTo: this.route });
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.paramSubs.unsubscribe();
  }
}
