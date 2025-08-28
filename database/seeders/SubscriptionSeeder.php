<?php

namespace Database\Seeders;

use App\Models\Subscription;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    public function run()
    {
        $consumer = User::where('role', 'consumer')->first();

        $user = User::first() ?? User::factory()->create([
            'name' => 'Default Subscriber',
            'email' => 'subscriber@example.com',
            'role' => 'customer',
        ]);

        $product = Product::inRandomOrder()->first() ?? Product::factory()->create([
            'user_id' => $user->id,
        ]);

        Subscription::create([
            // 'user_id' => $consumer->id,
            'user_id' => $user->id,
            'product_id' => $product->id,
            'plan_type' => 'weekly',
            'frequency' => 'weekly',
            'next_delivery_date' => now()->addDays(7),
            'status' => 'active',
        ]);
    }
}
