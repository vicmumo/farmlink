<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Farm;

class FarmController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Inertia::render('Farms/Index');
        $farms = Auth::user()->farms()->latest()->get();

        return Inertia::render('Farms/Index', [
            'farms' => $farms,
        ]);
    }
    public function create()
        {
            return Inertia::render('Farms/Create');
        }

    public function store(Request $request)
        {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'location' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $validated['owner'] = $request->user()->id;

            $request->user()->farms()->create($validated);          

            $validated['user_id'] = $request->user()->id;

            return redirect()->route('farms.index')->with('success', 'Farm created successfully.');
        }
    public function edit(Farm $farm)
    {
        $this->authorize('update', $farm); // Optional: add policy

         return Inertia::render('Farms/Edit', [
            'farm' => $farm,
        ]);
     }

    public function update(Request $request, Farm $farm)
    {
        $this->authorize('update', $farm); // Optional: add policy

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $farm->update($validated);

        return redirect()->route('farms.index')->with('success', 'Farm updated successfully.');
    }

}
