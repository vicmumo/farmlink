<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $consumer = User::where('role', 'consumer')->first();

        Order::create([
            'user_id' => $consumer->id,
            'total_price' => 210.00,
            'status' => 'confirmed',
            'delivery_date' => now()->addDays(2),
        ]);
    }
}
