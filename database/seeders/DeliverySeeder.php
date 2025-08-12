<?php

namespace Database\Seeders;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Database\Seeder;

class DeliverySeeder extends Seeder
{
    public function run()
    {
        $order = Order::first();

        Delivery::create([
            'order_id' => $order->id,
            'route_info' => 'Farm → Depot → Consumer',
            'storage_info' => 'Chilled crate, 4°C',
            'status' => 'scheduled',
        ]);
    }
}
