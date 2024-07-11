"use client"

const Home = () => {

  const doSubscribe = async () => {
    try {
      const response = await fetch('/api/subscribe', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: 'cxm@zengenti.com' })
      });
      
      if (response.ok) alert('Subscription successful!');
      else alert('Subscription failed. Please try again.');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred while subscribing. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--semantic-background-primary)] text-[var(--semantic-type-primary)]">
      <div className="max-w-[1000px] p-8 bg-[var(--semantic-background-secondary)] rounded-lg shadow-lg">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-semibold ml-4">Lockdown 2024</h1>
        </div>
        <div className="mt-8 flex gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email"  className="text-s text-left">Enter your email to subscribe</label>
            <input
              className="py-2 px-4 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-gray-400 flex-1"
              placeholder="Enter your email" type="email" name="email" id="email"
              />
            </div>
          <button
            type="button"
            onClick={doSubscribe}
            className="py-2 px-6 bg-[var(--semantic-action-prority-background)] hover:bg-[var(--semantic-action-prority-hover)] text-[var(--semantic-action-prority-text)] rounded-[0.25rem] focus:outline-none self-end"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
