import JobApplicationForm from '@/components/JobApplicationForm';

type Props = {
  params: { id: string };
};

export default function ApplyPage({ params }: Props) {
  return <JobApplicationForm id={params.id} />;
}
