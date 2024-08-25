<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function createCategory(Request $req)
{
    $data = $req->validate([
        "name" => "required|string",
    ]);

    // Create the category
    $category = Category::create($data);

    // Count the number of products for the newly created category
    $productCount = $category->products()->count();

    if ($category) {
        return response()->json([
            'message' => 'Category created successfully',
            'category' => $category,
            'products_count' => $productCount,
        ], 201);
    } else {
        return response()->json([
            'message' => 'Failed to create category'
        ], 500);
    }
}

    public function showAllCategories(){
        $categories = Category::withCount('products')->get();
        return $categories;
    }

    public function deleteCategory(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);
        }

        $productCount = $category->products()->count();

        if ($productCount > 0) {
            return response()->json([
                'message' => 'Cannot delete this category'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ], 200); // 200 is the HTTP status code for "OK"
    }

}