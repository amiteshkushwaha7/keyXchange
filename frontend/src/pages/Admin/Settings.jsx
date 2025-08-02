import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSettings } from '../../redux/features/adminSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Switch from '../../components/ui/Switch';

const Settings = () => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({
    storeName: 'Digital Goods Store',
    currency: 'USD',
    maintenanceMode: false,
    emailNotifications: true,
    inventoryThreshold: 10
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateSettings(settings)).unwrap();
      alert('Settings saved successfully!');
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Store Settings</h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">General Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              label="Store Name"
              name="storeName"
              value={settings.storeName}
              onChange={handleChange}
              required
            />
            <Input
              label="Currency"
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <Switch
              label="Maintenance Mode"
              name="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              When enabled, your store will be temporarily unavailable to customers.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Notifications</h2>
          
          <div className="mb-6">
            <Switch
              label="Email Notifications"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 mt-1">
              Receive email notifications for new orders and important updates.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Inventory</h2>
          
          <Input
            type="number"
            label="Low Inventory Threshold"
            name="inventoryThreshold"
            value={settings.inventoryThreshold}
            onChange={handleChange}
            min="1"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Receive alerts when product stock reaches this level.
          </p>
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;