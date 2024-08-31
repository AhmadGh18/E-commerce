<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function AddProduct(ProductRequest $req)
    {
        try {

            $thumbnailPath = $req->file('thumbnail')->store('Images', 'public');


            $product = Product::create([
                'title' => $req->title,
                'description' => $req->description,
                'category_id' => $req->category_id,
                'price' => $req->price,
                'thumbnail' => $thumbnailPath,
                'tags' => $req->tags,
                'gender'=>$req->gender,
                "age"=>$req->age,
            ]);

            if ($req->hasFile('images')) {
                foreach ($req->file('images') as $image) {
                    // Store each image and get its path
                    $path = $image->store('Images', 'public');

                    // Save image info to the Image table
                    Image::create([
                        'image_url' => $path,
                        'product_id' => $product->id, // Link the image to the created product
                    ]);
                }

                return response()->json([
                    'status' => true,
                    'message' => 'Product and images added successfully',
                    'product' => $product
                ], 201);
            } else {

                return response()->json([
                    'status' => true,
                    'message' => 'Product added successfully, but no images were uploaded',
                    'product' => $product
                ], 201);
            }

        } catch (\Throwable $th) {

            return response()->json([
                'status' => false,
                'message' => 'An error occurred: ' . $th->getMessage()
            ], 500);
        }
    }
    public function UpdateProduct(Request $req, $id)
    {
        try {
            $req->validate([
            "title" => "required|string",
            "description" => "required|string",
            "category_id" => "required|integer",
            "price" => "required|numeric",
            "tags" => "required|string",
            "gender" => "required|string",
            "age" => "required|string",
            ]);






            $product = Product::findOrFail($id);

            if ($req->hasFile('thumbnail')) {
                if ($product->thumbnail) {
                    Storage::disk('public')->delete($product->thumbnail);
                }

                // Store the new thumbnail
                $thumbnailPath = $req->file('thumbnail')->store('Images', 'public');
                $product->thumbnail = $thumbnailPath;
            }

            // Update product attributes
            $product->title = $req->input('title');
            $product->description = $req->input('description');
            $product->category_id = $req->input('category_id');
            $product->price = $req->input('price');
            $product->tags = $req->input('tags');
            $product->gender = $req->input('gender'); // Ensure these fields are updated as needed
            $product->age = $req->input('age');
            $product->save();

            // Check if new images have been uploaded
            if ($req->hasFile('images')) {
                foreach ($req->file('images') as $image) {
                    // Store each image and get its path
                    $path = $image->store('Images', 'public');

                    Image::create([
                        'image_url' => $path,
                        'product_id' => $product->id,
                    ]);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Product updated successfully',
                'product' => $product
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred: ' . $th->getMessage()
            ], 500);
        }
    }

    public function viewAllProducts(Request $request)
    {
        try {
            // Retrieve query parameters
            $gender = $request->query('gender');
            $age = $request->query('age');
            $category = $request->query('category');
            $price = $request->query('price');
            $search = $request->query('search');

            // Start building the query
            $query = Product::with(['images', 'category']);

            // Apply filters
            if ($gender) {
                $query->where('gender', $gender);
            }
            if ($age) {
                $query->where('age', $age);
            }
            if ($category) {
                $query->where('category_id', $category);
            }
            if ($price) {
                if ($price === '51+') {
                    $query->where('price', '>=', 51);
                } else {
                    // Assuming price format is "min-max"
                    list($minPrice, $maxPrice) = explode('-', $price);
                    $query->whereBetween('price', [(float)$minPrice, (float)$maxPrice]);
                }
            }
            if ($search) {
                $query->where('title', 'like', '%' . $search . '%');
            }

            // Order products randomly
            $products = $query->inRandomOrder()->get();

            return response()->json([
                'status' => true,
                'products' => $products
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred: ' . $th->getMessage()
            ], 500);
        }
    }


    public function viewSingleProduct($id)
{
    try {
        $product = Product::with(['images', 'category'])->findOrFail($id);

        return response()->json([
            'status' => true,
            'product' => $product
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => 'An error occurred: ' . $th->getMessage()
        ], 500);
    }
}
// In ProductController.php

public function getFilteredProducts(Request $request)
{
    try {
        $query = Product::query();

        // Apply filters based on request parameters
        if ($request->has('gender')) {
            $query->where('gender', $request->input('gender'));
        }
        if ($request->has('age')) {
            $query->where('age', $request->input('age'));
        }
        if ($request->has('category')) {
            $query->where('category_id', $request->input('category'));
        }
        if ($request->has('price')) {
            $priceRange = explode('-', $request->input('price'));
            $query->whereBetween('price', [intval($priceRange[0]), intval($priceRange[1])]);
        }

        $products = $query->inRandomOrder()->get();

        return response()->json([
            'status' => true,
            'products' => $products
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => 'An error occurred: ' . $th->getMessage()
        ], 500);
    }
}
public function delete(Request $request, $id) {


    $product = Product::find($id);

    // Check if the product exists
    if ($product) {
        // Delete the product
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    } else {
        return response()->json(['error' => 'Product not found'], 404);
    }
}



}