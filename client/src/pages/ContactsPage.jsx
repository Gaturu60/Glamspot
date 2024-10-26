function ContactsPage() {
  return (
    <div className="bg-contacts-bg bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md text-center">
        <h1 className="text-5xl font-bold text-purple-700">
          Welcome to Glamspot
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          We value your feedback and we are always looking foward to engaging
          with you!
        </p>
        <p>Please feel free to contact us.</p>
        <p className="mt-4 text-lg text-gray-600">
          Email us: glamspot@glamspotservices.com Call us: 0700002200
        </p>
      </div>
    </div>
  );
}

export default ContactsPage;
