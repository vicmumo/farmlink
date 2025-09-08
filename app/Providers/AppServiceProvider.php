<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
    protected $policies = [
    \App\Models\Farm::class => \App\Policies\FarmPolicy::class,
    \App\Models\Product::class => \App\Policies\ProductPolicy::class,
    \App\Models\Marketplace::class => \App\Policies\MarketplacePolicy::class,
    ];

}
