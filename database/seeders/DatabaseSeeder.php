<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\ProductSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            FarmSeeder::class,
            ProductSeeder::class, // Use this, not ProductsTableSeeder
            SubscriptionSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            DeliverySeeder::class,
            ProductCategorySeeder::class,
        ]);
    }
}
