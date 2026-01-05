'use client';

import React from 'react';
import { Rocket, Zap, Crown } from 'lucide-react';
import { PricingPlan } from '@/lib/types/pricing';
import { colors } from '@/lib/colors';

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (plan: PricingPlan) => void;
  billingCycle?: 'monthly' | 'annual';
}

const getPlanIcon = (planId: string) => {
  switch (planId) {
    case 'starter':
      return Rocket;
    case 'pro':
      return Zap;
    case 'advanced':
      return Crown;
    default:
      return Rocket;
  }
};

export const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect, billingCycle = 'monthly' }) => {
  const Icon = getPlanIcon(plan.id);
  
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '20px',
        padding: '40px 32px',
        transition: 'all 0.3s',
        background: colors.ai.cardBg,
        border: plan.isPopular
          ? `1px solid ${colors.primary.purple}`
          : `1px solid ${colors.ai.cardBorder}`,
        boxShadow: plan.isPopular
          ? colors.ai.popular.shadow
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header: Icon, Name e Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: colors.ai.iconBg }}>
            <Icon
              style={{ width: '24px', height: '24px', color: colors.text.white }}
              strokeWidth={2}
            />
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '700', color: colors.text.primary }}>{plan.name}</h3>
        </div>
        
        {plan.badge && (
          <span style={{
            background: colors.ai.badgeBg,
            color: colors.ai.badgeText,
            fontSize: '12px',
            fontWeight: '600',
            padding: '6px 12px',
            borderRadius: '6px',
          }}>
            {plan.badge}
          </span>
        )}
      </div>

      {/* Preço */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '48px', fontWeight: '700', color: colors.text.primary }}>
            R$ {plan.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <p style={{ color: colors.text.secondary, fontSize: '14px', marginTop: '8px' }}>
          por {plan.period}
          {billingCycle === 'annual' && plan.period === 'anual' && (
            <span style={{ color: colors.primary.green, marginLeft: '8px', fontWeight: '600' }}>
              • Economize 20%
            </span>
          )}
        </p>
      </div>

      {/* Descrição */}
      <p style={{ color: colors.text.secondary, fontSize: '14px', marginBottom: '28px', lineHeight: '1.6' }}>
        {plan.description}
      </p>

      {/* Botão */}
      <button
        onClick={() => onSelect(plan)}
        style={{
          width: '100%',
          marginBottom: '28px',
          padding: '16px 24px',
          fontSize: '15px',
          fontWeight: '600',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          background: colors.gradient.vibrant,
          color: colors.text.inverse,
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25), 0 4px 16px rgba(139, 92, 246, 0.15)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
      >
        Começar agora
      </button>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
        {plan.features.map((feature, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: colors.ai.checkCircleBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <svg
                style={{ width: '12px', height: '12px', color: colors.ai.checkIcon }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span style={{ color: colors.text.primary, fontSize: '14px' }}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
