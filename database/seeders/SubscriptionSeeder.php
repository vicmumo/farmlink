<?php

namespace Database\Seeders;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    public function run()
    {
        $consumer = User::where('role', 'consumer')->first();

        Subscription::create([
            'user_id' => $consumer->id,
            'plan_type' => 'weekly',
            'next_delivery' => now()->addDays(7),
            'status' => 'active',
        ]);
    }
}
