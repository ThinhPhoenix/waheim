import './inner-html.css';

export default function InnerHTML(props: { html: string }) {
  return (
    <div
      className="inner-html"
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}
