const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const financialPlanningSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    currentAge: { type: Number, required: true },
    retirementAge: { type: Number, required: true },
    currentIncome: { type: Number, required: true },
    inflationRate: { type: Number, required: true },
    capitalGainsTax: { type: Number, required: true },
    incomeTax: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = models.FinancialPlanning || model('FinancialPlanning', financialPlanningSchema);
