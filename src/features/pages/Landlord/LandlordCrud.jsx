import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload, X, Sparkles, Loader2 } from "lucide-react"; // added Sparkles & Loader2
import Lheader from "./Lheader";
import { usePgcreate } from "../../../hooks/usePgCreate";
import { useGetUser } from "../../../hooks/useUser";
import { NavLink, useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

export default function LandlordCrud() {
  const navigate = useNavigate();
  const { isLoggedIn } = useGetUser();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      propertyName: "",
      nearme: "",
      bhkConfig: "1 RK",
      description: "",
      streetAddress: "",
      city: "",
      state: "",
      rentPrice: "",
      securityDeposit: "",
      availableFrom: "",
      availableTo: "",
      areaname: "",
      depoRefund: "True",
      amenities: {
        wifi: true,
        ac: false,
        parking: false,
        geyser: false,
        tv: true,
        food: true,
        laundry: true,
        powerBackup: true,
      },
      uploadedImages: [], // will hold File objects
    },
  });

  // Watch amenities and uploadedImages reactively
  const amenities = watch("amenities");
  const uploadedImages = watch("uploadedImages") || [];

  // Local preview URLs to show thumbnails (kept separate for cleanup)
  const [previews, setPreviews] = useState([]);

  // AI UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState("");
  const [tone, setTone] = useState("friendly"); // friendly | professional | concise | descriptive
  const [lengthWords, setLengthWords] = useState(120);

  // Whenever uploadedImages changes (File objects), create object URLs for preview
  useEffect(() => {
    // create previews
    const urls = uploadedImages.map((file) => {
      if (file && file instanceof File) return URL.createObjectURL(file);
      // If the uploadedImages contains strings (existing remote images), just pass them through
      return typeof file === "string" ? file : null;
    });
    // revoke previous urls
    setPreviews((prev) => {
      prev.forEach((u) => {
        if (u && u.startsWith("blob:")) URL.revokeObjectURL(u);
      });
      return urls;
    });

    // cleanup on unmount
    return () => {
      urls.forEach((u) => {
        if (u && u.startsWith("blob:")) URL.revokeObjectURL(u);
      });
    };
  }, [uploadedImages]);

  // helper: toggle amenity
  const toggleAmenity = (key) => {
    setValue(`amenities.${key}`, !amenities?.[key], { shouldDirty: true });
  };

  // remove image at index (updates both form value and previews)
  const removeImage = (index) => {
    const newFiles = (uploadedImages || []).filter((_, i) => i !== index);
    setValue("uploadedImages", newFiles, { shouldDirty: true });
  };

  // handle file input change (Controller will call onChange)
  const handleFilesSelected = (filesList, onChange) => {
    const files = Array.from(filesList);

    // validate each file - you could collect errors and show them; for simplicity we filter invalid files out
    const validFiles = files.filter((f) => {
      if (!ALLOWED_TYPES.includes(f.type)) return false;
      if (f.size > MAX_FILE_SIZE) return false;
      return true;
    });

    // if you want to show warnings for invalid files, you could set a separate state for that
    // set the form value to the selected valid files (concatenate with existing if needed)
    const current = uploadedImages || [];
    onChange([...current, ...validFiles]);
  };

  const { createPg, isLoading, error } = usePgcreate();

  // -----------------------
  // AI generate description
  // -----------------------
  async function generateDescription() {
    setGenerateError("");
    setIsGenerating(true);
    try {
      // Build a prompt payload using available form fields to guide the AI
      const payload = {
        tone,
        length_words: lengthWords,
        // give some context if available
        propertyName: watch("propertyName"),
        nearme: watch("nearme"),
        bhkConfig: watch("bhkConfig"),
        city: watch("city"),
        areaname: watch("areaname"),
      };

      // Call your backend endpoint. IMPORTANT: keep your API key on the server.
      const res = await fetch("/api/generate-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to generate description");
      }

      const data = await res.json();
      const generated = data.description || "";

      // set value into react-hook-form
      setValue("description", generated, {
        shouldDirty: true,
        shouldTouch: true,
      });

      setIsGenerating(false);
    } catch (err) {
      console.error("AI generation error:", err);
      setGenerateError(
        err?.message || "Something went wrong while generating."
      );
      setIsGenerating(false);
    }
  }

  const onSubmit = (data) => {
    const formData = new FormData();

    // ---------------------------------------------------------
    // 1. Append Simple Fields
    // ---------------------------------------------------------
    formData.append("title", data.propertyName);
    formData.append("description", data.description);
    formData.append("address_line_1", data.streetAddress);
    formData.append("city", data.city);
    formData.append("area_name", data.areaname);
    formData.append("monthly_rent_base", data.rentPrice);
    formData.append("security_deposit_months", data.securityDeposit);

    // Boolean values get converted to strings "true" / "false" automatically
    formData.append("is_deposit_refundable", data.depoRefund);
    formData.append("near_me", data.nearme);

    // ---------------------------------------------------------
    // 2. Handle Amenities (The Object Fix)
    // ---------------------------------------------------------
    if (data.amenities) {
      Object.keys(data.amenities).forEach((key) => {
        // Only append the amenity name if the value is true
        if (data.amenities[key] === true) {
          formData.append("amenities", key);
        }
      });
    }

    // ---------------------------------------------------------
    // 3. Handle Images (The Binary Fix)
    // ---------------------------------------------------------
    const imageArray = data.uploadedImages || [];

    imageArray.forEach((file) => {
      // Appends every file to the same key 'image_url'
      // Multer will see this as an array of files
      formData.append("image_url", file);
    });

    // ---------------------------------------------------------
    // 4. Send Request
    // ---------------------------------------------------------
    createPg(formData);
  };

  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Lheader />
      <main className="px-4 sm:px-8 md:px-10 lg:px-20 py-5 md:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 px-4 mb-4">
            <a
              className="text-slate-500 dark:text-slate-400 text-sm font-medium"
              href="#"
            >
              Dashboard
            </a>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              /
            </span>
            <a
              className="text-slate-500 dark:text-slate-400 text-sm font-medium"
              href="#"
            >
              My Listings
            </a>
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              /
            </span>
            <span className="text-slate-800 dark:text-slate-200 text-sm font-medium">
              Create New Listing
            </span>
          </div>

          {/* Page Heading */}
          <div className="flex flex-wrap justify-between gap-3 p-4 mb-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-4xl font-black">
                Create a New Listing
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base">
                Fill in the details below to publish your property.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-4 sm:p-6 md:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              {/* Left Column */}
              <div className="flex flex-col gap-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold pb-5">
                    Basic Information
                  </h2>
                  <div className="flex flex-col gap-6">
                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Property Name
                      </p>
                      <input
                        type="text"
                        {...register("propertyName", {
                          required: "Property name is required",
                        })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., Sunshine PG for Gents"
                      />
                      {errors.propertyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.propertyName.message}
                        </p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Area Name
                      </p>
                      <input
                        type="text"
                        {...register("areaname", {
                          required: "Area name is required",
                        })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., Amingaon"
                      />
                      {errors.areaname && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.areaname.message}
                        </p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Famous place Near You
                      </p>
                      <input
                        type="text"
                        {...register("nearme")}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., GNRC/AIIMS-MEDICAL"
                      />
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        BHK Configuration
                      </p>
                      <select
                        {...register("bhkConfig")}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option>1 RK</option>
                        <option>1 BHK</option>
                        <option>2 BHK</option>
                        <option>3 BHK</option>
                        <option>4+ BHK</option>
                        <option>Single Room</option>
                        <option>Shared Room</option>
                      </select>
                    </label>

                    {/*  */}

                    <label className="flex flex-col">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                            Property Description
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Describe your property, its features, and nearby
                            landmarks.
                          </p>
                        </div>

                        {/* AI controls */}
                        <div className="flex items-center gap-2">
                          <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="text-xs rounded-lg border px-2 py-1 bg-white dark:bg-slate-800/60 border-slate-300 dark:border-slate-700"
                            title="Select tone for AI-generated text"
                          >
                            <option value="friendly">Friendly</option>
                            <option value="professional">Professional</option>
                            <option value="concise">Concise</option>
                            <option value="descriptive">Descriptive</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => navigate("/generatedPage")}
                            disabled={isGenerating}
                            className="flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                            aria-label="Generate AI description"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>Need AI generated Description?</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <textarea
                        {...register("description")}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-32 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50 mt-3"
                        placeholder="Describe your property, its features, and nearby landmarks."
                      />
                      {/* {generateError && (
                        <p className="text-red-500 text-sm mt-2">
                          {generateError}
                        </p>
                      )} */}

                      {/* length slider (optional) */}
                      {/* <div className="mt-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={40}
                            max={300}
                            step={10}
                            value={lengthWords}
                            onChange={(e) =>
                              setLengthWords(Number(e.target.value))
                            }
                          />
                          <span className="text-slate-500">
                            Length ≈ {lengthWords} words
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">
                          Tone: {tone}
                        </div>
                      </div> */}
                    </label>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold pt-5 pb-5">
                    Location
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="flex flex-col sm:col-span-2">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Street Address
                      </p>
                      <input
                        type="text"
                        {...register("streetAddress")}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="123, Main Street"
                      />
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        City
                      </p>
                      <input
                        type="text"
                        {...register("city", { required: "City is required" })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., Bangalore"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.city.message}
                        </p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        State
                      </p>
                      <input
                        type="text"
                        {...register("state", {
                          required: "State is required",
                        })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., Karnataka"
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.state.message}
                        </p>
                      )}
                    </label>
                  </div>
                </div>

                {/* Pricing & Availability */}
                <div>
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold pt-5 pb-5">
                    Pricing & Availability
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Rent Price (per month)
                      </p>
                      <input
                        type="number"
                        {...register("rentPrice", {
                          required: "Rent is required",
                          min: { value: 0, message: "Rent must be >= 0" },
                        })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., 15000"
                      />
                      {errors.rentPrice && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.rentPrice.message}
                        </p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Security Deposit
                      </p>
                      <input
                        type="number"
                        {...register("securityDeposit", {
                          min: { value: 0, message: "Must be >= 0" },
                        })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="e.g., 30000"
                      />
                      {errors.securityDeposit && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.securityDeposit.message}
                        </p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Deposite Refundable
                      </p>
                      <select
                        {...register("depoRefund")}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        <option>True</option>
                        <option>False</option>
                      </select>
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Available From
                      </p>
                      <input
                        type="date"
                        {...register("availableFrom", {
                          required: "Available from is required",
                        })}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                      {errors.availableFrom && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.availableFrom.message}
                        </p>
                      )}
                    </label>

                    <label className="flex flex-col">
                      <p className="text-slate-800 dark:text-slate-300 text-sm font-medium pb-2">
                        Available To (optional)
                      </p>
                      <input
                        type="date"
                        {...register("availableTo")}
                        className="w-full rounded-lg text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/50 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-8">
                {/* Property Photos */}
                <div>
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold pb-5">
                    Property Photos
                  </h2>

                  {/* File input controlled by react-hook-form */}
                  <Controller
                    control={control}
                    name="uploadedImages"
                    render={({ field: { value = [], onChange } }) => (
                      <>
                        <div
                          // clicking this container will open the file picker
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-semibold text-blue-500">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">
                            SVG, PNG, JPG or GIF (MAX. 5MB each)
                          </p>

                          {/* hidden input but accessible via ref */}
                          <input
                            ref={fileInputRef}
                            aria-label="Upload images"
                            type="file"
                            accept="image/*"
                            multiple
                            className="sr-only"
                            onChange={(e) =>
                              handleFilesSelected(e.target.files, onChange)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="mt-3 text-xs text-slate-500">
                          Allowed: jpg, jpeg, png, gif — max 5MB per image
                        </div>

                        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                          {(value || []).map((fileOrUrl, index) => {
                            const src = previews[index];
                            return (
                              <div
                                key={index}
                                className="relative group aspect-square"
                              >
                                {src ? (
                                  <img
                                    src={src}
                                    alt={`Property ${index + 1}`}
                                    className="h-full w-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="h-full w-full rounded-lg bg-slate-200 flex items-center justify-center">
                                    No preview
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation(); // <--- IMPORTANT: prevent re-opening file dialog
                                    removeImage(index);
                                  }}
                                  className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  />
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="text-slate-900 dark:text-white text-[22px] font-bold pt-5 pb-5">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(amenities || {}).map(([key, checked]) => (
                      <label
                        key={key}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={!!checked}
                          onChange={() => toggleAmenity(key)}
                          className="w-5 h-5 rounded text-blue-500 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-blue-500/50"
                        />
                        <span className="text-slate-700 dark:text-slate-300 text-sm capitalize">
                          {key === "wifi"
                            ? "Wi-Fi"
                            : key === "ac"
                            ? "AC"
                            : key === "tv"
                            ? "TV"
                            : key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="lg:col-span-2 flex justify-end items-center gap-4 pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="min-w-[84px] rounded-lg h-12 px-6 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                {isLoggedIn ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[84px] rounded-lg h-12 px-6 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
                  >
                    {isSubmitting ? "Saving..." : "Save Listing"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="min-w-[84px] rounded-lg h-12 px-6 bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors"
                  >
                    Save Listing
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
