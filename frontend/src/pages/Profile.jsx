import { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaIdBadge } from "react-icons/fa";

import { getProfile } from "../services/profile";
import { useAuth } from "../context/AuthContext";

function Profile() {

    const { user } = useAuth();
    const USER_ID = user?.id ?? 1;

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        async function loadProfile() {

            try {

                const data = await getProfile(USER_ID);

                setProfile(data);

            } catch (err) {

                console.log(err);

            }

        }

        loadProfile();

    }, []);

    if (!profile) {

        return (
            <div className="text-white text-2xl">
                Loading Profile...
            </div>
        );

    }

    return (

        <div className="max-w-3xl mx-auto">

            <div className="bg-black/50 backdrop-blur-xl rounded-3xl border border-pink-500/20 p-10">

                <div className="flex flex-col items-center">

                    <FaUserCircle
                        className="text-pink-500 mb-6"
                        size={120}
                    />

                    <h1 className="text-5xl font-bold text-white">

                        {profile.username}

                    </h1>

                    <p className="text-gray-400 mt-2">

                        DevilBeats User

                    </p>

                </div>

                <div className="mt-10 space-y-6">

                    <div className="flex items-center gap-4 bg-black/40 p-5 rounded-xl">

                        <FaIdBadge className="text-cyan-400 text-2xl"/>

                        <div>

                            <p className="text-gray-400">

                                User ID

                            </p>

                            <h2 className="text-xl font-bold">

                                {profile.id}

                            </h2>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 bg-black/40 p-5 rounded-xl">

                        <FaEnvelope className="text-pink-400 text-2xl"/>

                        <div>

                            <p className="text-gray-400">

                                Email

                            </p>

                            <h2 className="text-xl font-bold">

                                {profile.email}

                            </h2>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;