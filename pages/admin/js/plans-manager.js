import { PLANS } from './plans.js';
import { stateManager } from './state.js';
import { showSuccess, showError } from './ui.js';

export class PlansManager {
  constructor() {
    this.plans = { ...PLANS };
  }

  updatePlan(planId, updates) {
    try {
      if (!this.plans[planId]) {
        throw new Error('Plan no encontrado');
      }

      this.plans[planId] = {
        ...this.plans[planId],
        ...updates
      };

      stateManager.updateState('plans', this.plans);
      showSuccess('Plan actualizado correctamente');
      return true;
    } catch (error) {
      showError('Error al actualizar el plan');
      console.error('Error updating plan:', error);
      return false;
    }
  }

  getPlanDetails(planId) {
    return this.plans[planId];
  }

  getAllPlans() {
    return Object.values(this.plans);
  }

  addFeatureToPlan(planId, feature) {
    try {
      if (!this.plans[planId]) {
        throw new Error('Plan no encontrado');
      }

      this.plans[planId].features.push(feature);
      stateManager.updateState('plans', this.plans);
      showSuccess('Característica agregada correctamente');
      return true;
    } catch (error) {
      showError('Error al agregar la característica');
      console.error('Error adding feature:', error);
      return false;
    }
  }

  removeFeatureFromPlan(planId, featureIndex) {
    try {
      if (!this.plans[planId]) {
        throw new Error('Plan no encontrado');
      }

      this.plans[planId].features.splice(featureIndex, 1);
      stateManager.updateState('plans', this.plans);
      showSuccess('Característica eliminada correctamente');
      return true;
    } catch (error) {
      showError('Error al eliminar la característica');
      console.error('Error removing feature:', error);
      return false;
    }
  }

  updateFeature(planId, featureIndex, updates) {
    try {
      if (!this.plans[planId]) {
        throw new Error('Plan no encontrado');
      }

      this.plans[planId].features[featureIndex] = {
        ...this.plans[planId].features[featureIndex],
        ...updates
      };

      stateManager.updateState('plans', this.plans);
      showSuccess('Característica actualizada correctamente');
      return true;
    } catch (error) {
      showError('Error al actualizar la característica');
      console.error('Error updating feature:', error);
      return false;
    }
  }
}

export const plansManager = new PlansManager();