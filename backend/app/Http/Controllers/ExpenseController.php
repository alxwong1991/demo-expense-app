<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    #Get all
    public function index(Request $request)
    {
        $expenses = $request->user()->expenses;
        return response()->json($expenses);
    }

    #Create
    public function store(Request $request)
    {
        $expense = new Expense();
        $expense->amount = $request->amount;
        $expense->description = $request->description;
        $expense->user_id = $request->user()->id;
        $expense->save();

        return response()->json([
            'message' => 'Success',
            'data' => $expense
        ], 201);
    }

    #Get by ID
    public function show($id)
    {
        $expense = Expense::where(['id' => $id, 'user_id' => auth()->user()->id])->first();

        if (!$expense) {
            return response()->json(['message' => 'Resource not found'], 404);
        }

        return response()->json($expense);
    }

    #Update
    public function update(Request $request, $id)
    {
        $expense = Expense::where(['id' => $id, 'user_id' => $request->user()->id])->first();

        if (!$expense) {
            return response()->json(['message' => 'Resource not found'], 404);
        }

        $expense->amount = $request->amount;
        $expense->description = $request->description;
        $expense->save();

        return response()->json([
            'message' => 'Success',
            'data' => $expense
        ]);
    }

    #Delete
    public function destroy($id)
    {
        $expense = Expense::where(['id' => $id, 'user_id' => auth()->user()->id]);

        if (!$expense) {
            return response()->json(['message' => 'Resource not found'], 404);
        }

        $expense->delete();
        return response()->json(['message' => 'Success']);
    }
}
