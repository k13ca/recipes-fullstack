import AsideMenu from "../components/aside-menu";
import RecipeContainer from "../components/recipe-container";

export default function RecipesPage() {
  return (
    <div className="body">
      <AsideMenu></AsideMenu>
      <RecipeContainer />
    </div>
  );
}
