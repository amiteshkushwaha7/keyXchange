import { useState, useEffect } from 'react';
import { useCreateCouponMutation, useUpdateCouponMutation } from '../../redux/api/adminApi';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import DatePicker from '../../ui/DatePicker';
import Button from '../../ui/Button';

const CouponFormModal = ({ isOpen, couponId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    expiryDate: new Date(),
    minOrderAmount: '',
    maxUses: '',
    status: 'active'
  });

  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

  useEffect(() => {
    if (couponId) {
      // Fetch coupon data and set to formData
      // This would be replaced with actual data fetching
      setFormData({
        code: 'SUMMER20',
        discountType: 'percentage',
        discountValue: '20',
        expiryDate: new Date('2023-12-31'),
        minOrderAmount: '50',
        maxUses: '100',
        status: 'active'
      });
    } else {
      setFormData({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        expiryDate: new Date(),
        minOrderAmount: '',
        maxUses: '',
        status: 'active'
      });
    }
  }, [couponId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, expiryDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (couponId) {
        await updateCoupon({ id: couponId, data: formData }).unwrap();
      } else {
        await createCoupon(formData).unwrap();
      }
      onSuccess();
    } catch (err) {
      console.error('Failed to save coupon:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={couponId ? 'Edit Coupon' : 'Create Coupon'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Coupon Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Discount Type"
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            options={[
              { value: 'percentage', label: 'Percentage' },
              { value: 'fixed', label: 'Fixed Amount' }
            ]}
            required
          />
          <Input
            label={formData.discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
            name="discountValue"
            type="number"
            value={formData.discountValue}
            onChange={handleChange}
            min="1"
            max={formData.discountType === 'percentage' ? '100' : undefined}
            required
          />
        </div>

        <DatePicker
          label="Expiry Date"
          selected={formData.expiryDate}
          onChange={handleDateChange}
          minDate={new Date()}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Minimum Order Amount"
            name="minOrderAmount"
            type="number"
            value={formData.minOrderAmount}
            onChange={handleChange}
            min="0"
          />
          <Input
            label="Maximum Uses"
            name="maxUses"
            type="number"
            value={formData.maxUses}
            onChange={handleChange}
            min="1"
          />
        </div>

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
          required
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isCreating || isUpdating}>
            {couponId ? 'Update Coupon' : 'Create Coupon'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CouponFormModal;