import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { format } from "date-fns";
import PrimaryButton from "@/Components/PrimaryButton";
import TextArea from "@/Components/TextArea";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Show({ auth, activity }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        status: activity.status,
        remarks: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("activity-updates.store", activity.id), {
            onSuccess: () => reset("remarks"),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Activity Details
                </h2>
            }
        >
            <Head title="Activity Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between mb-6">
                                <h2 className="text-lg font-medium">
                                    {activity.name}
                                </h2>
                                <Link
                                    href={route("activities.index")}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Back to Activities
                                </Link>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-md font-medium">
                                    Description:
                                </h3>
                                <p className="mt-1">
                                    {activity.description ||
                                        "No description provided."}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-md font-medium">
                                    Current Status:
                                </h3>
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        activity.status === "done"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {activity.status}
                                </span>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-md font-medium">
                                    Last Remarks:
                                </h3>
                                <p className="mt-1">
                                    {activity.remarks || "No remarks provided."}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-md font-medium">
                                    Last Updated By:
                                </h3>
                                <p className="mt-1">
                                    {activity.user?.name || "N/A"}
                                </p>
                            </div>

                            <div className="mb-4">
                                <h3 className="text-md font-medium">
                                    Last Updated At:
                                </h3>
                                <p className="mt-1">
                                    {activity.updated_at
                                        ? format(
                                              new Date(activity.updated_at),
                                              "PPpp"
                                          )
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-medium mb-4">
                                Update Activity Status
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                    />
                                    <select
                                        id="status"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="done">Done</option>
                                    </select>
                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <InputLabel
                                        htmlFor="remarks"
                                        value="Remarks"
                                    />
                                    <TextArea
                                        id="remarks"
                                        className="mt-1 block w-full"
                                        value={data.remarks}
                                        onChange={(e) =>
                                            setData("remarks", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.remarks}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Update Status
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-lg font-medium mb-4">
                                Activity Update History
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Remarks
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Updated By
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Updated At
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {activity.updates.map((update) => (
                                            <tr key={update.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            update.status ===
                                                            "done"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                    >
                                                        {update.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {update.remarks ||
                                                        "No remarks provided."}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {update.user?.name || "N/A"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {update.created_at
                                                        ? format(
                                                              new Date(
                                                                  update.created_at
                                                              ),
                                                              "PPpp"
                                                          )
                                                        : "N/A"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
