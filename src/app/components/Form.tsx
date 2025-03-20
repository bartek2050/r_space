import {useForm, useFieldArray} from "react-hook-form";
import {useState} from "react";

export default function FeatureForm() {
    const {
        register,
        control,
        handleSubmit,
        setValue,
        reset,
        formState: {errors},
    } = useForm({
        defaultValues: {
            features: [{name: "", variants: [""]}],
        },
    });

    const {fields, append, remove} = useFieldArray({
        control,
        name: "features",
    });

    const onSubmit = (formData) => {
        console.log(formData);
        reset()
    };

    return (
        <div className="min-w-lg mx-auto p-6 bg-gray-900 text-white shadow-lg rounded-sm">
            <h2 className="text-lg font-semibold mb-4">Dodaj cechy i warianty</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {fields.map((feature, index) => (
                    <div key={feature.id} className="p-4 border border-gray-700 rounded-lg bg-gray-800">
                        <FeatureInput
                            register={register}
                            setValue={setValue}
                            remove={() => remove(index)}
                            index={index}
                            errors={errors}
                        />
                        <FeatureVariants control={control} index={index} register={register} errors={errors}/>
                    </div>
                ))}

                {fields.length < 3 && (
                    <button
                        type="button"
                        onClick={() => append({name: "", variants: [""]})}
                        className="w-full px-4 py-2 border border-white rounded-lg bg-transparent hover:bg-gray-700"
                    >
                        + Dodaj cechę
                    </button>
                )}
                <button type="submit"
                        disabled={fields.length < 1 || fields.length > 3 || fields.some(f => f.variants.length < 1 || f.variants.length > 10)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                    Zapisz cechy
                </button>
            </form>
        </div>
    );
}

function FeatureInput({register, setValue, remove, index, errors}) {
    const [isOpen, setIsOpen] = useState(false);
    const predefinedFeatures = ["Rozmiar", "Kolor", "Pojemność"];

    return (
        <div className="relative">
            <label className="text-sm font-semibold mb-1 block">Cecha {index + 1}</label>
            <div className="flex items-center gap-2">
                <div className="relative w-full">
                    <input
                        {...register(`features.${index}.name`, {
                            required: "Nazwa cechy jest wymagana",
                            minLength: {value: 1, message: "Min. 1 znak"},
                            maxLength: {value: 30, message: "Max. 30 znaków"},
                        })}
                        placeholder="Wpisz własne"
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    <span className="absolute right-3 top-2 text-gray-400 pointer-events-none">
                        ▼
                    </span>
                    {isOpen && (
                        <div
                            className="absolute w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg z-10">
                            {predefinedFeatures.map((feature) => (
                                <div
                                    key={feature}
                                    onClick={() => {
                                        setValue(`features.${index}.name`, feature);
                                        setIsOpen(false);
                                    }}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-600"
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {index > 0 && (
                    <button
                        type="button"
                        onClick={remove}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Usuń
                    </button>
                )}
            </div>
            {errors.features?.[index]?.name && (
                <p className="text-red-400 text-sm mt-1">{errors.features[index].name.message}</p>
            )}
        </div>
    );
}

function FeatureVariants({control, index, register, errors}) {
    const {fields, append, remove} = useFieldArray({
        control,
        name: `features.${index}.variants`,
    });

    return (
        <div className="mt-4 space-y-2">
            {fields.map((variant, vIndex) => (
                <div key={variant.id} className="flex items-center gap-4">
                    <input
                        {...register(`features.${index}.variants.${vIndex}`, {
                            required: "Wariant jest wymagany",
                            minLength: {value: 1, message: "Min. 1 znak"},
                            maxLength: {value: 40, message: "Max. 40 znaków"},
                        })}
                        placeholder="Wariant"
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <p>{errors.features?.[index]?.variants?.[vIndex]?.message}</p>
                    {fields.length > 1 && (
                        <button
                            type="button"
                            onClick={() => remove(vIndex)}
                            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                        >
                            ✕
                        </button>
                    )}
                </div>
            ))}
            {errors.features?.[index]?.variants && (
                <p className="text-red-400 text-sm mt-1">{errors.features[index].variants.message}</p>
            )}
            {fields.length < 10 && (
                <button
                    type="button"
                    onClick={() => append("")}
                    className="mt-2 w-full px-4 py-2 border border-white rounded-lg bg-transparent hover:bg-gray-700"
                >
                    Dodaj wariant
                </button>
            )}
        </div>
    );
}