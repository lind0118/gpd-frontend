import { AcademicTemplateForm } from "@/components/AcademicTemplateForm";
import { ModalError } from "@/components/ModalError";
import { getAcademicPrograms, getAllAcademicWorkers } from "@/models/transactions";
import { promiseResolver } from "@/utils";

export default function Index({ academicPrograms, academicWorkers, getSsrError }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-center text-utim tracking-widest capitalize p-2 m-2">Crear plantilla</h1>
      <ModalError error={getSsrError} />
      <AcademicTemplateForm academicPrograms={academicPrograms} academicWorkers={academicWorkers} />
    </>
  )
}

export const getStaticProps = async () => {
  const eduPromise = getAcademicPrograms()
  const acaPromise = getAllAcademicWorkers()
  const [eduData, acaData] = await promiseResolver([eduPromise, acaPromise])
  const error = eduData.error || acaData.error
  if (error) {
    console.error('#ERROR# Error al obtener datos de programas educativos y/o trabajadores')
  }
  return {
    revalidate: 3,
    props: {
      getSsrError: error ? 'Algo salió mal, recarga la página' : null,
      academicPrograms: eduData.data,
      academicWorkers: acaData.data,
    }
  }
}

export const getStaticProps = async () => {
  const eduPromise = supabase.from('programaseducativos').select('siglas,descripcion')
  const acaPromise = supabase.from('dpersonales').select('ide,nombre,puesto,area').likeAnyOf('puesto', [
    '%asignatura%',
    '%Tiempo Completo%',
    '%de Apoyo%',
  ]).in('area', [
    'P.E. de Tecnologías de la Información',
    'P.E. de Lengua Inglesa',
    'P.E. de Lengua inglesa',
  ])
  const promiseResolver = async (promiseList) => {
    const results = await Promise.allSettled(promiseList)
    const data = results.map(r => r.value)
    return data
  }
  const [eduData, acaData] = await promiseResolver([eduPromise, acaPromise])
  if (eduData.error || acaData.error) {
    return {
      props: {
        error: 'Error al cargar los datos'
      }
    }
  }
  return {
    props: {
      programasEducativos: eduData.data,
      academicWorkers: acaData.data,
    }
  }
}
