<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {


    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/updateInfo',[AuthController::class, 'updateInfo']);
});
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/createCategory',[CategoryController::class,'createCategory']);
Route::post('/AddProduct',[ProductController::class,'AddProduct']);
Route::post("/UpdateProduct/{id}", [ProductController::class, 'UpdateProduct']);
Route::get('/viewAllProducts',[ProductController::class, 'viewAllProducts']);
Route::get('/singleitem/{id}',[ProductController::class, 'viewSingleProduct']);
Route::post('/createOrder',[OrdersController::class, 'createOrder']);
Route::get('/orders', [OrdersController::class, 'viewAllOrders']);
Route::get('/orders/{id}', [OrdersController::class, 'viewSingleOrder']);
Route::get('/showAllCategories',[CategoryController::class, 'showAllCategories']);
Route::delete('/deleteCategory/{id}',[CategoryController::class, 'deleteCategory']);
Route::get('/filtered-products', [ProductController::class, 'getFilteredProducts']);