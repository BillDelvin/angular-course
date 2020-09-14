import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";
import { LoggingService } from "../logging.service";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  ingredients: Ingredient[];
  ingsChangeSubs: Subscription;

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingsChangeSubs = this.slService.ingredientChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
    this.loggingService.printLog("Hello from shoping-list ngOnInit");
  }

  onEditItem(index: number) {
    this.slService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.ingsChangeSubs.unsubscribe();
  }
}
