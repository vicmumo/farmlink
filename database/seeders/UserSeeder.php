<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Mumo Farmer',
            'email' => 'farmer@farmlink.test',
            'password' => Hash::make('password'),
            'role' => 'farmer',
        ]);

        User::create([
            'name' => 'Mumo Consumer',
            'email' => 'consumer@farmlink.test',
            'password' => Hash::make('password'),
            'role' => 'consumer',
        ]);
    }
}
