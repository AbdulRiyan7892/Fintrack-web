import { useState } from "react";
import Button from "../ui/Button";

function PasswordCard({ onSave }) {

    const [form,setForm]=useState({

        currentPassword:"",

        newPassword:""

    });

    return (

        <div className="rounded-3xl bg-white p-8 shadow-lg">

            <h2 className="mb-6 text-2xl font-bold">

                Change Password

            </h2>
            <p className="mt-1 mb-6 text-sm text-slate-500">

            Choose a strong password to keep your account secure.

            </p>

            <div className="space-y-5">

                <input
                    type="password"
                    placeholder="Current Password"
                    className="h-11 w-full rounded-lg border border-gray-300 px-4"
                    value={form.currentPassword}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            currentPassword:e.target.value
                        })
                    }
                />

                <input
                    type="password"
                    placeholder="New Password"
                    className="h-11 w-full rounded-lg border border-gray-300 px-4"
                    value={form.newPassword}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            newPassword:e.target.value
                        })
                    }
                />

                <Button
                    onClick={()=>onSave(form)}
                >

                    Update Password

                </Button>

            </div>

        </div>

    );

}

export default PasswordCard;