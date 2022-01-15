import { BounceLoader } from "react-spinners";

const NewsForm = ({
  onSubmit,
  title,
  author,
  body,
  handleChange,
  isLoading,
  isError,
  isSuccess,
  actionStatus,
  action,
}) => {
  return (
    <form onSubmit={onSubmit} className="max-w-[330px] mb-8 mt-3">
      <div className="flex items-center space-x-3 justify-between">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={title ?? ""}
          onChange={handleChange}
          className="input-form"
          placeholder="Title..."
          required
        />
      </div>

      <div className="flex items-center justify-between mt-4 space-x-3">
        <label htmlFor="author">Author: </label>
        <input
          type="text"
          name="author"
          value={author ?? ""}
          onChange={handleChange}
          className="input-form"
          placeholder="Author..."
          required
        />
      </div>

      <div className="mt-6">
        <label className="block" htmlFor="body">
          Body:
        </label>
        <textarea
          name="body"
          value={body ?? ""}
          onChange={handleChange}
          className="input-form mt-2 resize-none h-48 mb-3"
          placeholder="News Body..."
          required
        />
      </div>

      <div className="flex items-center space-x-3">
        <button className="custom-btn px-5 flex items-center" type="submit" disabled={isLoading}>
          {isLoading ? <span>{actionStatus}</span> : <span>{action}</span>}
          <BounceLoader size={20} color={"#fff"} loading={isLoading && !isError && !isSuccess} />
        </button>
      </div>
    </form>
  );
};

export default NewsForm;
