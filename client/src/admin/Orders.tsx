import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Orders = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">Orders Overview</h1>
        <div className="space-y-8">
          {/* Restaurant Orders display here */}
          <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border-gray-200 dark:border-gray-200">
            <div className="flex-1 mb-6 sm:mb-0">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex justify-start">
                Sanjay Solanki
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 flex justify-start">
                <span className="font-semibold pr-2">Address:</span>
                Sindhu Farm Road, Badarpur
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-2 flex justify-start">
                <span className="font-semibold pr-2">Total Amount:</span>
                ₹160
              </p>
            </div>
            <div className="w-full sm:w-1/3 block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Label>Order Status</Label>
              <Select>
                <SelectTrigger className="mt-3">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                        
                      ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((status: string, index: number) => (
                        <SelectItem key={index} value={status.toLowerCase()}>
                          {status}
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
