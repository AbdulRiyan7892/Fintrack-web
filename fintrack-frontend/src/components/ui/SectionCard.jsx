function SectionCard({
    title,
    description,
    children
}){

return(

<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

<div className="mb-5">

<h2 className="text-lg font-semibold">

{title}

</h2>

<p className="mt-1 text-sm text-slate-500">

{description}

</p>

</div>

{children}

</div>

)

}

export default SectionCard;