import { useGetPaymentMethodsQuery } from '../../redux/api/paymentApi';

const PaymentMethodsPage = () => {
  const { data: paymentMethods, isLoading } = useGetPaymentMethodsQuery();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Payment Methods</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Payment Method
        </button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : paymentMethods?.length === 0 ? (
        <p>No saved payment methods</p>
      ) : (
        <div className="space-y-4">
          {paymentMethods?.map((method) => (
            <div key={method._id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium">{method.cardType} ending in {method.last4}</h4>
                <p className="text-sm text-gray-600">Expires {method.expMonth}/{method.expYear}</p>
              </div>
              <button className="text-red-600 hover:text-red-800">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};