<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MarketplaceController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TraceController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('marketplace', MarketplaceController::class)->except(['destroy']);

    Route::resource('farms', FarmController::class);

    Route::resource('products', ProductController::class);

    Route::resource('subscriptions', SubscriptionController::class);

    Route::resource('orders', OrderController::class);

    Route::get('/trace/{product}', [TraceController::class, 'show'])->name('trace.show');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
