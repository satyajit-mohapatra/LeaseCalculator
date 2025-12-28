
import React, { useState } from 'react';
import { calculateLeaseDeal } from '../utils/calculateLease';

const LeaseCalculator = () => {
    const [msrp, setMsrp] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [termMonths, setTermMonths] = useState(36);
    const result = calculateLeaseDeal(
        parseFloat(msrp),
        parseFloat(monthlyPayment),
        parseFloat(downPayment) || 0,
        parseFloat(termMonths) || 36
    );

    return (
        <div className="card animate-fade-in">
            <h1>Lease Deal Rater</h1>
            <p className="subtitle">Is your car lease a good deal? (1.25% Rule)</p>

            <div className="form-group">
                <label>MSRP ($)</label>
                <input
                    type="number"
                    placeholder="e.g. 50000"
                    value={msrp}
                    onChange={(e) => setMsrp(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Monthly Payment ($)</label>
                <input
                    type="number"
                    placeholder="e.g. 500"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Down Payment / Due at Signing ($)</label>
                <input
                    type="number"
                    placeholder="e.g. 2000 (0 is best)"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Lease Term (Months)</label>
                <input
                    type="number"
                    placeholder="e.g. 36"
                    value={termMonths}
                    onChange={(e) => setTermMonths(e.target.value)}
                />
            </div>

            {result && (
                <div className="result-card animate-fade-in" style={{ borderColor: result.color }}>
                    <div className="result-label" style={{ color: result.color }}>
                        {result.label}
                    </div>
                    <div className="result-value" style={{ color: result.color }}>
                        {result.ratio}%
                    </div>
                    <div className="result-sub">
                        MSRP Ratio (Target: &lt; 1.25%)
                    </div>
                    {parseFloat(downPayment) > 0 && (
                        <div className="result-sub" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                            Effective Monthly: ${result.effectivePayment}
                        </div>
                    )}
                </div>
            )}

            {!result && msrp && (
                <div className="result-card" style={{ opacity: 0.5 }}>
                    Please enter Monthly Payment
                </div>
            )}
        </div>
    );
};

export default LeaseCalculator;
