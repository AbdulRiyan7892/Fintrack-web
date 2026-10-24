import { useState, useEffect } from "react";
import Button from "../ui/Button";

function ProfileCard({ user, onSave }) {

    const [form, setForm] = useState({
        name: "",
        currency: ""
    });

    useEffect(() => {

        if (user) {

            setForm({
                name: user.name,
                currency: user.currency
            });

        }

    }, [user]);

    return (

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-lg font-semibold">

                Profile

            </h2>
            <p className="mt-1 mb-6 text-sm text-slate-500">

            Update your profile information.

            </p>

            <div className="space-y-5">

                <input
                    className="h-11 w-full rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:outline-none"
                    value={form.name}
                    placeholder="Name"
                    onChange={(e)=>
                        setForm({
                            ...form,
                            name:e.target.value
                        })
                    }
                />

                <input
                    disabled
                    className="w-full rounded-xl border bg-slate-100 p-3"
                    value={user?.email || ""}
                />

                <select
                   className="h-11 w-full rounded-lg border border-gray-300 px-4 focus:border-blue-500 focus:outline-none"
                    value={form.currency}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            currency:e.target.value
                        })
                    }
                >

                    <option value="INR">INR</option>

                    <option value="USD">USD</option>

                    <option value="EUR">EUR</option>

                    <option value="GBP">GBP</option>

                </select>

                <Button
                    onClick={()=>onSave(form)}
                >

                    Save Profile

                </Button>

            </div>

        </div>

    );

}

export default ProfileCard;