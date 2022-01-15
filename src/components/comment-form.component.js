import { BounceLoader } from "react-spinners";

const CommentsForm = ({
  onSubmit,
  name,
  avatar,
  comment,
  handleChange,
  isLoading,
  isError,
  isSuccess,
  edit = false,
  setEdit,
}) => {
  return (
    <form onSubmit={onSubmit} className="max-w-[330px] mb-8 mt-3">
      <div className="flex items-center space-x-3 justify-between">
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="input-form"
          placeholder="Your Name..."
          required
        />
      </div>

      <div className="flex items-center justify-between mt-4 space-x-3">
        <label htmlFor="avatar">Avatar: </label>
        <input
          type="text"
          name="avatar"
          value={avatar}
          onChange={handleChange}
          className="input-form"
          placeholder="Add Avatar URL..."
          required
        />
      </div>

      <div className="mt-6">
        <label className="block" htmlFor="comment">
          Comment:
        </label>
        <textarea
          name="comment"
          value={comment}
          onChange={handleChange}
          className="input-form mt-2 resize-none h-24 mb-3"
          placeholder="Add Comment..."
          required
        />
      </div>

      <div className="flex items-center space-x-3">
        <button className="custom-btn px-5 flex items-center" type="submit" disabled={isLoading}>
          {isLoading ? <span>Submitting...</span> : <span>Submit</span>}
          <BounceLoader size={20} color={"#fff"} loading={isLoading && !isError && !isSuccess} />
        </button>

        {edit && (
          <button
            className="custom-btn bg-white border border-gray-700 text-black px-5 flex items-center"
            type="submit"
            onClick={() => setEdit(false)}
          >
            <span>Cancel</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentsForm;
