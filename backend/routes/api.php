<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {


    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/updateInfo',[AuthController::class, 'updateInfo']);
    Route::post('/payment', [PaymentController::class, 'createPaymentIntent']);
    Route::delete('/deleteCategory/{id}',[CategoryController::class, 'deleteCategory']);
    Route::post('/createCategory',[CategoryController::class,'createCategory']);
Route::post('/AddProduct',[ProductController::class,'AddProduct']);
Route::put("/UpdateProduct/{id}", [ProductController::class, 'UpdateProduct']);
Route::post('/createOrder',[OrdersController::class, 'createOrder']);
Route::get('/orders', [OrdersController::class, 'viewAllOrders']);
Route::get('/viewAllPayments',[PaymentController::class, 'viewAllPayments']);
Route::get('/viewSingleOrder/{id}', [OrdersController::class, 'viewSingleOrder']);


});
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/viewAllProducts',[ProductController::class, 'viewAllProducts']);
Route::get('/singleitem/{id}',[ProductController::class, 'viewSingleProduct']);

Route::get('/showAllCategories',[CategoryController::class, 'showAllCategories']);
Route::get('/filtered-products', [ProductController::class, 'getFilteredProducts']);