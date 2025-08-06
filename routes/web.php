<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::inertia('/dashboard', 'Dashboard');
    Route::inertia('/marketplace', 'Marketplace');
    Route::resource('farms', FarmController::class);
    Route::resource('products', ProductController::class);
    Route::resource('subscriptions', SubscriptionController::class);
    Route::resource('orders', OrderController::class);
    Route::get('/trace/{product}', [TraceController::class, 'show']);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
