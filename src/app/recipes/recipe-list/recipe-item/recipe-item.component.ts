import { Component, OnInit, Input } from "@angular/core";
import { Recipes } from "../../recipes.model";
import { RecipesService } from "../../recipes.service";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipes;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {}

  onSelect() {
    this.recipesService.recipesSelected.emit(this.recipe);
  }
}
